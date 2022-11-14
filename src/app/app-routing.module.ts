import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MessageComponent } from './components/message/message.component';
import { OptionsComponent } from './components/options/options.component';
import { RegisterComponent } from './components/register/register.component';
 

const routes: Routes = [
  {path:'' ,  redirectTo:'about' , pathMatch:'full'},
 
{path:'home' , component:HomeComponent },
{path:'login' , component:LoginComponent },
{path:'register' , component:RegisterComponent },
{path:'options' , component:OptionsComponent },
{path:'about' , component:AboutComponent },
{path:'contact' , component:ContactComponent },
{path:'message/:id' , component:MessageComponent },


 
 




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
