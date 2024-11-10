import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginUsername: string = '';
  loginPassword: string = '';
  loginErrorMessage: string | null = null;

  registerUsername: string = '';
  registerPassword: string = '';
  isRegisterModalOpen = false;

  users: { username: string; password: string }[] = []; 

  constructor(private router: Router) {}

  ngOnInit() {
  
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }


  onLogin() {
    const user = this.users.find(
      (u) => u.username === this.loginUsername && u.password === this.loginPassword
    );
    if (user) {
      localStorage.setItem('jwtToken', 'mock-jwt-token'); 
      localStorage.setItem('loggedInUser', this.loginUsername); 
      this.router.navigate(['/items']); 
    } else {
      this.loginErrorMessage = 'Invalid username or password';
    }
  }

 
  toggleRegisterModal() {
    this.isRegisterModalOpen = !this.isRegisterModalOpen;
  }


  onRegister() {
    if (this.users.some((u) => u.username === this.registerUsername)) {
      alert('Username already exists. Please choose another.');
    } else {
      this.users.push({ username: this.registerUsername, password: this.registerPassword });


      localStorage.setItem('users', JSON.stringify(this.users));

      alert('Registration successful! You can now log in.');
      this.toggleRegisterModal(); 
    }
  }
}
