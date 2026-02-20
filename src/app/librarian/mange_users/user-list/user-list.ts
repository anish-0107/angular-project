import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { User } from '../../../models/user-model';
import { DatePipe, JsonPipe, NgTemplateOutlet, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingSpinner } from "../../../shared/loading-spinner/loading-spinner";
import { Issue } from '../../../models/issue-model';

@Component({
  selector: 'app-user-list',
  imports: [UpperCasePipe, NgTemplateOutlet, DatePipe, JsonPipe, FormsModule, LoadingSpinner],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {

  Users: User[] = []

  fullName: string = ''
  email: string = ''
  phone: string = ''
  address: string = ''
  role: string = ''
  isActive: boolean = false
  maxBooksAllowed: number = 0

  searchedUser!: User
  isLoading: boolean = true
  ishown: boolean = false
  selectedUserForEdit: any

  selectedUserHistory: any[] | null = null

  ngOnInit(): void {
    this.getUsers()
  }

  private apiUrl = "http://localhost:3001/api/users"
  private http = inject(HttpClient)
  private cdr = inject(ChangeDetectorRef)

  getUsers() {
    this.http.get<User[]>(`${this.apiUrl}`).subscribe({
      next: (data) => {
        this.Users = data
        this.isLoading = false
        this.cdr.detectChanges()
        console.log(data);
      }
    })
  }

  getUsersById(id: number) {
    this.http.get<User>(`${this.apiUrl}/${id}`).subscribe({
      next: (data) => {
        this.searchedUser = data
        console.log(data);
      }
    })
  }

  updateUser() {
    const id = this.selectedUserForEdit.id
    const updatedUSer = {
      fullName: this.selectedUserForEdit.fullName,
      email: this.selectedUserForEdit.email,
      phone: this.selectedUserForEdit.phone,
      address: this.selectedUserForEdit.address,
      role: this.selectedUserForEdit.role,
      isActive: this.selectedUserForEdit.isActive,
      maxBooksAllowed: this.selectedUserForEdit.maxBooksAllowed
    }
    this.http.put<User>(`${this.apiUrl}/${id}`, {...this.selectedUserForEdit ,...updatedUSer }).subscribe({
      next: (data) => {
        console.log("data updated", data);
        this.closeEditModal()
        window.location.reload()
      }
    })
  }
  
  deleteUser(id: number) {
    this.http.delete<User>(`${this.apiUrl}/${id}`).subscribe({
      next: (data) => {
        this.Users = this.Users.filter(user => user.id != id)
        console.log(data);
      }
    })
  }

  getBorrwingHis(id: number) {
    this.http.get<Issue[]>(`${this.apiUrl}/${id}/issues`).subscribe({
      next: (data) => {
        this.selectedUserHistory = data
        this.cdr.detectChanges()
        console.log(data);
      }
    })
  }

  closeHistory() {
    this.selectedUserHistory = null;
  }

  updateUserForm(userId: number) {
    const user = this.Users.find(u => u.id === userId);
    if (user) {
      this.selectedUserForEdit = { ...user };
    }
  }

  closeEditModal() {
    this.selectedUserForEdit = null;
  }

}
