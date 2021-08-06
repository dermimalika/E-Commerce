import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authentication.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id:any
  profile:any=[]
  urlImag='../../assets/images/avatars/'

  mode:string='profile'
  //------- Register Var
   email=""
   firstName=""
   lastName=""
   phone=""
   usename=""
   adr=""
   genre=""
   avatar=""

  constructor(private route:ActivatedRoute,
    private profileService: ProfileService,
    private auth: AuthenticationService,
    private toastr: ToastrService,) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getProfile();
  }

  getProfile(){
    this.profileService.getProfile(this.id).subscribe((data: any)=>{
      this.profile=data;
      console.log("profile :\n",this.profile);
    });
  }

  updateProfile(){

    let client={
      email:this.email,
      firstName:this.firstName,
      lastName:this.lastName,
      phone:this.phone,
      username:this.usename,
      adr:this.adr,
      genre:this.genre,
      avatar:this.avatar
    }
    console.log("update Profile Service",client);
    

    this.profileService.update(client,this.id).subscribe((data: any)=>{
      this.profile=data;
      console.log("update :\n",this.profile);
      this.toastr.success('Update Profile!', 'Your Profile Has been Updated Succesfully ');
      this.mode='profile';
      window.location.reload();

    });
  }

}
