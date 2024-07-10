import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HEALTH_PARAMS_LIST, KeyValueVo, UserBookingDto, UserBookingInvestigationDto, UserVo } from 'aayam-clinic-core';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';

@Component({
    selector: 'app-patient-observation-edit',
    templateUrl: './patient-observation-edit.component.html'
})
export class PatientObservationEditComponent implements OnInit, OnChanges,AfterViewInit {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    @Input()
    userBooking!: UserBookingDto;
    @Output()
    userBookingChange = new EventEmitter<UserBookingDto>();

    @Input()
    pastBookingList!: Array<UserBookingDto>;

    @Input()
    doctorList!: UserVo[];

    @Input()
    userBookingInvestigationList!: UserBookingInvestigationDto;

    @Output()
    pubSub = new EventEmitter<any>();

    @ViewChild('observationForm', { static: true })
    observationForm!: NgForm;

    healtParamList = HEALTH_PARAMS_LIST;
    showSectionAdd = false;

    paramSelectList!: Array<any>;
    selectedParams = [] as Array<any>;
    dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        itemsShowLimit: 3,
        allowSearchFilter: true,
        enableCheckAll: false,
        maxHeight: 500
    };


    //newly added for photo addition
    @ViewChild('videoElement', { static: false })
    videoElement!: ElementRef<HTMLVideoElement>;
    showCamera = false;
    photo: string | null = null;

    /* ************************************ Constructors ************************************ */
    constructor() {
    }

    /* ************************************ Public Methods ************************************ */
    public ngOnInit(): void {
        this._init();
        // @ts-ignore
        this.observationForm?.valueChanges?.subscribe(() => {
            this._formChanged();
        });
        this.showSectionAdd = this.userBooking.booking.observation?.healthParams?.length > 0;
    }

    public ngAfterViewInit(): void {
        // videoElement should now be defined
    }
    public addNewObservation(): void {
        this.showSectionAdd = true;
    }

    public onParamSelect(item: any) {
        this.userBooking.booking.observation.healthParams = this.selectedParams.map((it: any) => {
            return {
                key: it.item_id,
                name: it.item_text,
                value: ''
            } as KeyValueVo;
        });

        // newly added for the photo addition
        if (item.item_text === 'Sugar') {
            this.startCamera();
        } else {
            this.stopCamera();
        }
        this.userBookingChange.emit(this.userBooking);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['userBookingInvestigationList']) {
            this.userBookingInvestigationList = changes['userBookingInvestigationList'].currentValue as UserBookingInvestigationDto;
        }
    }

    public getDoctorById(Id: string|null |undefined ): string|null |undefined {
        const doctorId = Id;
        const doctor = this.doctorList?.find(doc => doc._id === doctorId);
        return doctor ? doctor.nameF + " " + doctor.nameL : "";
      }

    /* ************************************ Private Methods ************************************ */
    private _init(): void {
        this.paramSelectList = this.healtParamList.map((it: any) => {
            return { item_id: it.id, item_text: it.name };
        });
    }

    private _formChanged(): void {
        const actionDto = {
            action: 'CHANGE_FORM_OBSERVATION',
            data: this.observationForm.invalid
        } as UiActionDto<boolean>;
        this.pubSub.emit(actionDto);
    }

    // newly added for the photo addition
    public capturePhoto(): void {
        if (!this.videoElement) return;
        const video: HTMLVideoElement = this.videoElement.nativeElement;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        // context?.drawImage(video, 0, 0, canvas.width, canvas.height);
        // this.photo = canvas.toDataURL('image/png');
        // this.stopCamera();
        if (context) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            this.photo = canvas.toDataURL('image/png');
        }
        this.stopCamera();
    }

    private async startCamera(): Promise<void> {
        // this.showCamera = true;
        // try {
        //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        //     this.videoElement.nativeElement.srcObject = stream;
        // } catch (error) {
        //     console.error('Error accessing camera: ', error);
        // }
        this.showCamera = true;
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (this.videoElement) {
                this.videoElement.nativeElement.srcObject = stream;
                this.videoElement.nativeElement.play();
            }
        } catch (error) {
            console.error('Error accessing camera: ', error);
        }
    }

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
    

    

}
