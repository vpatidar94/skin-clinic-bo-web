// import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
// import { AssetPathUtility } from "aayam-clinic-core";
// import { UserApi } from "src/app/@app/service/remote/user.api";
// import { environment } from "src/environments/environment";

// @Component ( {
//     selector: 'app-observation-images',
//     templateUrl: './observation-images.component.html',
//     styleUrls: ['./observation-images.component.scss'],
// })

// export class ObservationImagesComponent implements OnInit  {

//     title!: "observation"

//     fileEmpImg!: File;

//     observationImg!: [string];
    
    
//     images: string[] = [];
//     folder = 'OBSERVATION/295/';

//     private isUsingBackCamera: boolean = true;
    

// //newly added for photo addition
// @ViewChild('videoElement', { static: false })
// videoElement!: ElementRef<HTMLVideoElement>;
// showCamera = false;
// photo: string | null = null;

// visitId!: string;

// addMore: boolean = false;

// bucketUrl = environment.bucketUrl;

// constructor(
//     private userApi: UserApi,

// ){ console.log("hh",this.observationImg)};


// ngOnInit(): void {
//         this.userApi.getImages("OBSERVATION/298").subscribe(
//       (data) => {
//         this.images = data;
//         console.log("data",data);

//         console.log("data",this.images);

//       },
//       (error) => {
//         console.error('Failed to fetch images', error);
//       }
//     );
//   }

//   public async toggleCamera(): Promise<void> {
//     this.isUsingBackCamera = !this.isUsingBackCamera;
//     await this.startCamera(this.isUsingBackCamera);
// }

// // await this.startCamera(true);

// private async startCamera(useBackCamera: boolean = true): Promise<void> {
//     this.showCamera = true;
//     try {
//         const constraints = {
//             video: {
//                 facingMode: useBackCamera ? { exact: "environment" } : "user"
//             }
//         };
//         const stream = await navigator.mediaDevices.getUserMedia(constraints);
//         if (this.videoElement) {
//             this.videoElement.nativeElement.srcObject = stream;
//             this.videoElement.nativeElement.play();
//         }
//     } catch (error) {
//         console.error('Error accessing camera: ', error);
//     }
// }

// onCamera(): void {
//     console.log("camera is on ")
//     this.startCamera();
//     // this.stopCamera();
// }

//     public capturePhoto(): void {
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
    
//             // Convert data URL to Blob
//             fetch(dataUrl)
//             .then(res => res.blob())
//             .then(blob => {
//                 // Generate a unique name for the photo
//                 const uniqueName = `${this.visitId}_${Date.now()}.png`;
//                 const file = new File([blob], uniqueName, { type: 'image/png' });
//                 this.fileEmpImg = file; // Assign to fileImage variable
//                 this.uploadObservationImage(this.visitId, uniqueName);
//             })
//             .catch(error => console.error('Error converting to file: ', error));
//         }
//         this.stopCamera();
//         this.addMore=true;

//         // the below is to get the images 
//         this.userApi.getImages("OBSERVATION/298").subscribe(
//             (data) => {
//               this.images = data;
//               console.log("data",data);
      
//               console.log("data",this.images);
      
//             },
//             (error) => {
//               console.error('Failed to fetch images', error);
//             }
//           );
//     }
    
//     public uploadObservationImage(visitId: string, fileName: string): void {
//         console.log("here")
//         this.userApi.uploadObservationImage(this.fileEmpImg, visitId, fileName, AssetPathUtility.ASSET_IDENTITY.EMP_PHOTO).subscribe((res: any) => {
//             this.observationImg = res.body;
//             console.log("here is the ",this.observationImg)
//         });
//     }
    
// // newly added to add file as the photo

// onPhotoSelected(event:any){

// }
    

//     private stopCamera(): void {
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

// }



import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AssetPathUtility } from "aayam-clinic-core";
// import { NgxImageCompressService } from "ngx-image-compress";
import { UserApi } from "src/app/@app/service/remote/user.api";
import { environment } from "src/environments/environment";

@Component({
    selector: 'app-observation-images',
    templateUrl: './observation-images.component.html',
    styleUrls: ['./observation-images.component.scss'],
})
export class ObservationImagesComponent implements OnInit {
    title: string = "observation";
    fileEmpImg!: File;
    observationImg!: [string];
    images: string[] = [];
    folder = 'OBSERVATION/295/';
    visitId!: string;
    bucketUrl = environment.bucketUrl;
    addMore: boolean = false;

    @ViewChild('fileInput', { static: false })
    fileInput!: ElementRef<HTMLInputElement>;

    constructor(private userApi: UserApi,
        // private imageCompress: NgxImageCompressService
    ) {}

    ngOnInit(): void {
        this.loadImages();
    }

    loadImages(): void {
        this.userApi.getImages("OBSERVATION/298").subscribe(
            (data) => {
                this.images = data;
                console.log("data", data);
            },
            (error) => {
                console.error('Failed to fetch images', error);
            }
        );
    }

    onFileInputClick(): void {
        this.fileInput.nativeElement.click();
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            // this.fileEmpImg = file;
            // const uniqueName = `${this.visitId}_${Date.now()}.png`;
            // this.uploadObservationImage(this.visitId, uniqueName);
            this.compressImage(file);
        }
    }

// newly added to compress image start
// compressImage(file: File): void {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//         const imgBase64Path = reader.result as string;
//         this.imageCompress.compressFile(imgBase64Path, -1, 50, 50).then(
//             compressedImage => {
//                 // Convert the compressed base64 image back to a file
//                 const blob = this.dataURItoBlob(compressedImage.split(',')[1]);
//                 const compressedFile = new File([blob], file.name, { type: file.type });

//                 // Proceed with the upload
//                 this.fileEmpImg = compressedFile;
//                 const uniqueName = `${this.visitId}_${Date.now()}.png`;
//                 this.uploadObservationImage(this.visitId, uniqueName);
//             }
//         );
//     };
// }

// dataURItoBlob(dataURI: string): Blob {
//     const byteString = window.atob(dataURI);
//     const arrayBuffer = new ArrayBuffer(byteString.length);
//     const intArray = new Uint8Array(arrayBuffer);
//     for (let i = 0; i < byteString.length; i++) {
//         intArray[i] = byteString.charCodeAt(i);
//     }
//     return new Blob([intArray], { type: 'image/png' });
// }
//newly added to compress image end

compressImage(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            const maxWidth = 800;
            const maxHeight = 800;
            let width = img.width;
            let height = img.height;

            // Calculate the new dimensions while maintaining aspect ratio
            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round((height *= maxWidth / width));
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.round((width *= maxHeight / height));
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            if (ctx) {
                ctx.drawImage(img, 0, 0, width, height);

                // Compress the image to JPEG with quality of 0.7
                const compressedDataUrl = canvas.toDataURL('image/png', 0.9);

                // Convert the data URL to a file
                const blob = this.dataURItoBlob(compressedDataUrl);
                const compressedFile = new File([blob], file.name, { type: 'image/png' });

                // Proceed with the upload
                this.fileEmpImg = compressedFile;
                const uniqueName = `${this.visitId}_${Date.now()}.png`;
                this.uploadObservationImage(this.visitId, uniqueName);
            }
        };
    };
}

dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
    }
    // return new Blob([intArray], { type: 'image/jpeg' });
    return new Blob([intArray], { type: 'image/png' });

}







    public uploadObservationImage(visitId: string, fileName: string): void {
        this.userApi.uploadObservationImage(this.fileEmpImg, visitId, fileName, AssetPathUtility.ASSET_IDENTITY.EMP_PHOTO).subscribe((res: any) => {
            this.observationImg = res.body;
            console.log("Uploaded Image: ", this.observationImg);
            this.loadImages();
            this.addMore = true;
        });
    }
}
