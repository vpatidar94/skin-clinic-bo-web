import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AssetPathUtility } from "aayam-clinic-core";
import { UserApi } from "src/app/@app/service/remote/user.api";
import { environment } from "src/environments/environment";

@Component ( {
    selector: 'app-observation-images',
    templateUrl: './observation-images.component.html',
    styleUrls: ['./observation-images.component.scss'],
})

export class ObservationImagesComponent implements OnInit  {

    title!: "observation"

    fileEmpImg!: File;

    observationImg!: [string];
    
    
    images: string[] = [];
    folder = 'OBSERVATION/295/';

    private isUsingBackCamera: boolean = true;
    

//newly added for photo addition
@ViewChild('videoElement', { static: false })
videoElement!: ElementRef<HTMLVideoElement>;
showCamera = false;
photo: string | null = null;

visitId!: string;

bucketUrl = environment.bucketUrl;

constructor(
    private userApi: UserApi,

){ console.log("hh",this.observationImg)};


ngOnInit(): void {
        this.userApi.getImages(this.folder).subscribe(
      (data) => {
        this.images = data;
        console.log("data",data);

        console.log("data",this.images);

      },
      (error) => {
        console.error('Failed to fetch images', error);
      }
    );
  }

  public async toggleCamera(): Promise<void> {
    this.isUsingBackCamera = !this.isUsingBackCamera;
    await this.startCamera(this.isUsingBackCamera);
}

// await this.startCamera(true);

private async startCamera(useBackCamera: boolean = true): Promise<void> {
    this.showCamera = true;
    try {
        const constraints = {
            video: {
                facingMode: useBackCamera ? { exact: "environment" } : "user"
            }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (this.videoElement) {
            this.videoElement.nativeElement.srcObject = stream;
            this.videoElement.nativeElement.play();
        }
    } catch (error) {
        console.error('Error accessing camera: ', error);
    }
}

onCamera(): void {
    console.log("camera is on ")
    this.startCamera();
    // this.stopCamera();
}
    // newly added for the photo addition
    // public capturePhoto(): void {
    //     if (!this.videoElement) return;
    //     const video: HTMLVideoElement = this.videoElement.nativeElement;
    //     const canvas = document.createElement('canvas');
    //     canvas.width = video.videoWidth;
    //     canvas.height = video.videoHeight;
    //     const context = canvas.getContext('2d');
    //     // context?.drawImage(video, 0, 0, canvas.width, canvas.height);
    //     // this.photo = canvas.toDataURL('image/png');
    //     // this.stopCamera();
    //     if (context) {
    //         context.drawImage(video, 0, 0, canvas.width, canvas.height);
    //         this.photo = canvas.toDataURL('image/png');
    //         const dataUrl = this.photo;


    //         // Convert data URL to Blob
    //     fetch(dataUrl)
    //     .then(res => res.blob())
    //     .then(blob => {
    //         // Create a File from the Blob
    //         const file = new File([blob], 'photo.png', { type: 'image/png' });
    //         this.fileEmpImg = file; // Assign to fileImage variable
    //         console.log("the img",this.fileEmpImg);
    //         this.uploadUserImage(this.visitId);
    //     })
    //     .catch(error => console.error('Error converting to file: ', error));
    //     }
    //     this.stopCamera();
    // }


    public capturePhoto(): void {
        if (!this.videoElement) return;
        const video: HTMLVideoElement = this.videoElement.nativeElement;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
    
        if (context) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            this.photo = canvas.toDataURL('image/png');
            const dataUrl = this.photo;
    
            // Convert data URL to Blob
            fetch(dataUrl)
            .then(res => res.blob())
            .then(blob => {
                // Generate a unique name for the photo
                const uniqueName = `${this.visitId}_${Date.now()}.png`;
                const file = new File([blob], uniqueName, { type: 'image/png' });
                this.fileEmpImg = file; // Assign to fileImage variable
                this.uploadObservationImage(this.visitId, uniqueName);
            })
            .catch(error => console.error('Error converting to file: ', error));
        }
        this.stopCamera();

        this.userApi.getImages("OBSERVATION"+"/"+this.visitId).subscribe(
            (data) => {
              this.images = data;
              console.log("data",data);
      
              console.log("data",this.images);
      
            },
            (error) => {
              console.error('Failed to fetch images', error);
            }
          );
    }
    
    public uploadObservationImage(visitId: string, fileName: string): void {
        console.log("here")
        this.userApi.uploadObservationImage(this.fileEmpImg, visitId, fileName, AssetPathUtility.ASSET_IDENTITY.EMP_PHOTO).subscribe((res: any) => {
            this.observationImg = res.body;
            console.log("here is the ",this.observationImg)
        });
    }
    




    // private async startCamera(): Promise<void> {
    //     // this.showCamera = true;
    //     // try {
    //     //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    //     //     this.videoElement.nativeElement.srcObject = stream;
    //     // } catch (error) {
    //     //     console.error('Error accessing camera: ', error);
    //     // }
    //     this.showCamera = true;
    //     try {
    //         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    //         if (this.videoElement) {
    //             this.videoElement.nativeElement.srcObject = stream;
    //             this.videoElement.nativeElement.play();
    //         }
    //     } catch (error) {
    //         console.error('Error accessing camera: ', error);
    //     }
    // }

    private stopCamera(): void {
        // this.showCamera = false;
        // const video: HTMLVideoElement = this.videoElement.nativeElement;
        // const stream = video.srcObject as MediaStream;
        // if (stream) {
        //     const tracks = stream.getTracks();
        //     tracks.forEach(track => track.stop());
        // }
        // video.srcObject = null;

        if (!this.videoElement) return;

        this.showCamera = false;
        const video: HTMLVideoElement = this.videoElement.nativeElement;
        const stream = video.srcObject as MediaStream;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        }
        video.srcObject = null;
    }
    


    // public uploadUserImage(empId: string): void {
    //     this.userApi.uploadUserImage(this.fileEmpImg, empId, AssetPathUtility.ASSET_IDENTITY.EMP_PHOTO).subscribe((res: any) => {
    //     //     this.staff.user.img = res.body;
    //     //     this.staffChange.emit(this.staff);
    //     this.observationImg = res.body;
    //     });
    // }
    

}





// observation-photo-upload.component.ts

// import { Component, ElementRef, ViewChild } from "@angular/core";
// import { AssetPathUtility } from "aayam-clinic-core";
// import { UserApi } from "src/app/@app/service/remote/user.api";
// import { environment } from "src/environments/environment";

// @Component({
//     selector: 'app-observation-photo-upload',
//     templateUrl: './observation-photo-upload.component.html',
// })
// export class ObservationPhotoUploadComponent {
//     title!: "observation";
//     fileEmpImgs: File[] = [];
//     observationImgs: string[] | null = null;

//     @ViewChild('videoElement', { static: false })
//     videoElement!: ElementRef<HTMLVideoElement>;
//     showCamera = false;
//     photo: string | null = null;

//     visitId!: string;
//     bucketUrl = environment.bucketUrl;

//     constructor(private userApi: UserApi) {};

//     onCamera(): void {
//         console.log("camera is on");
//         this.startCamera();
//     }

//     capturePhoto(): void {
//         if (!this.videoElement) return;
//         const video: HTMLVideoElement = this.videoElement.nativeElement;
//         const canvas = document.createElement('canvas');
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         const context = canvas.getContext('2d');
//         if (context) {
//             context.drawImage(video, 0, 0, canvas.width, canvas.height);
//             this.photo = canvas.toDataURL('image/png');
//             const dataUrl = this.photo;

//             fetch(dataUrl)
//                 .then(res => res.blob())
//                 .then(blob => {
//                     const file = new File([blob], 'photo.png', { type: 'image/png' });
//                     this.fileEmpImgs.push(file); // Add to file array
//                     this.uploadUserImages(this.visitId);
//                 })
//                 .catch(error => console.error('Error converting to file: ', error));
//         }
//         this.stopCamera();
//     }

//     startCamera(): void {
//         this.showCamera = true;
//         navigator.mediaDevices.getUserMedia({ video: true })
//             .then(stream => {
//                 if (this.videoElement) {
//                     this.videoElement.nativeElement.srcObject = stream;
//                     this.videoElement.nativeElement.play();
//                 }
//             })
//             .catch(error => console.error('Error accessing camera: ', error));
//     }

//     stopCamera(): void {
//         if (!this.videoElement) return;
//         this.showCamera = false;
//         const video: HTMLVideoElement = this.videoElement.nativeElement;
//         const stream = video.srcObject as MediaStream;
//         if (stream) {
//             const tracks = stream.getTracks();
//             tracks.forEach(track => track.stop());
//         }
//         video.srcObject = null;
//     }

//     uploadUserImages(visitId: string): void {
//         console.log('visitId:', visitId);  // Check if visitId is defined
//     if (!visitId) {
//         console.error('visitId is undefined');
//         return;
//     }
//         const formData = new FormData();
//         this.fileEmpImgs.forEach(file => formData.append('files', file));
//         this.userApi.uploadObservationImages(formData, visitId, AssetPathUtility.ASSET_IDENTITY.EMP_PHOTO).subscribe((res: any) => {
//             this.observationImgs = res.body;
//         });
//     }

//     ngOnInit(): void {
//         this.userApi.getObservationImages(this.visitId).subscribe((res: any) => {
//             this.observationImgs = res.body;
//         });
//     }
// }


