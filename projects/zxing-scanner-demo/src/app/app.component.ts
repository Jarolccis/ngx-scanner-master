import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { FormatsDialogComponent } from './formats-dialog/formats-dialog.component';
import { AppInfoDialogComponent } from './app-info-dialog/app-info-dialog.component';
import { FormControl } from '@angular/forms';
import { SearchService } from './services/search.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SearchService],
})
export class AppComponent {
  availableDevices: MediaDeviceInfo[];
  deviceCurrent: MediaDeviceInfo;
  deviceSelected: string;
  search = new FormControl('');
  isLoading = false;
  nameProduct = '';
  marca = '';
  precio: Number;
  precioCRM: Number;
  isResult = false;
  isPriceEQ = false;
  msg='';
  msgHeader='';
  isMsg=false;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  constructor(
    private readonly _dialog: MatDialog,
    private searchService: SearchService,
    private spinner: NgxSpinnerService
  ) {}

  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.search.setValue(resultString);
    //this.hasDevices=false;
    this.searchProduct();
   // this.isResult=false;
  }

  onDeviceSelectChange(selected: string) {
    console.log("ENTRO")
    const selectedStr = selected || '';
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find((x) => x.deviceId === selected);
    this.deviceCurrent = device || undefined;
  }

  onDeviceChange(device: MediaDeviceInfo) {
    console.log("ENTRO2")
    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    console.log("device",device);
    console.log("this.availableDevices",this.availableDevices);
    const nroCamaras = this.availableDevices.length;
    this.deviceCurrent = this.availableDevices[3] || undefined;
  }

  openFormatsDialog() {
    const data = {
      formatsEnabled: this.formatsEnabled,
    };

    this._dialog
      .open(FormatsDialogComponent, { data })
      .afterClosed()
      .subscribe((x) => {
        if (x) {
          this.formatsEnabled = x;
        }
      });
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  openInfoDialog() {
    const data = {
      hasDevices: this.hasDevices,
      hasPermission: this.hasPermission,
    };

    this._dialog.open(AppInfoDialogComponent, { data });
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

  searchProduct() {
    this.isLoading = true;
    this.spinner.show();
    this.searchService.searchProducts$('124', this.search.value).subscribe(
      (res) => {
        try {
          console.log('RESPIETA');
          console.log('res', res);
        
          this.nameProduct = res.name;
          this.marca = res.description;
          this.precio = res.precio;
          this.precioCRM = res.precioCMR;
          console.log("PCMR_RES",res);
          console.log("PCMR",res.precioCMR);
          console.log("PCMR2", this.precioCRM);
          if (res.precio === res.precioCMR) {
            this.isPriceEQ = true;
          } else {
            this.isPriceEQ = false;
          }
          if(res.precio){
            this.msg='Para consultar otro producto, vuelve a escanear';
            this.isMsg = true;
          }else{
            this.msgHeader ='Lo sentimos 🤯'
            this.msg='Consulta el precio de este producto con un colaborador de Tottus';
            this.isMsg = false;
          }


          this.isLoading = false;
          this.isResult = true;
          this.search.setValue('');
          this.qrResultString = null;
          this.spinner.hide();
        } catch (error) {
          this.isLoading = false;
          this.spinner.hide();
        }
      },
      (err) => {
        console.log('err', err);
        this.search.setValue('');
        this.msgHeader ='Lo sentimos 🤯'
        this.msg='Consulta el precio de este producto con un colaborador de Tottus';
        this.isMsg = false;
        this.isResult = true;
        this.spinner.hide();
        //Capturamos el error

        this.isLoading = false;
      }
    );
  }
}
