import { Component } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';

// Services
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dashboard-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class DashboardProfileComponent {
  loading = false;
  avatarUrl: string;

  constructor(
    private msg: NzMessageService
  ) {}

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isPng = file.type === 'image/png';
      if (!isPng) {
        this.msg.error('You can only upload PNG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      // check height
      this.checkImageDimension(file).then(dimensionRes => {
        if (!dimensionRes) {
          this.msg.error('Image need to be 100x100');
          observer.complete();
          return;
        }

        observer.next(isPng && isLt2M && dimensionRes);
        observer.complete();
      });
    });
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        resolve(width === height && width === 100);
      };
    });
  }

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }
}
