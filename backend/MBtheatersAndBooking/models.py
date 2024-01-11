from email.policy import default
from importlib.util import module_from_spec
from stat import SF_APPEND
from tkinter import CASCADE
from typing import Self
from unittest.util import _MAX_LENGTH
from django.db import models
from account.models import User
from MBmovies.models import *


class Theater_M(models.Model):
    T_ID = models.AutoField(primary_key=True)
    T_Name = models.CharField(max_length=50,null=False,blank=False)
    T_Flat_Add = models.CharField(max_length=200,null=False,blank=False)
    T_Street_Add = models.CharField(max_length=200,null=False,blank=False)
    # City_ID= models.ForeignKey(Movie_M, on_delete=models.CASCADE,null=False,blank=False)
    T_Pin = models.IntegerField(null=False,blank=False) 
    T_Open_Date = models.DateField()
    T_No_Of_Screen = models.IntegerField(null=False,blank=False) 
    Theater_Manager_ID= models.ForeignKey(User, on_delete=models.CASCADE,null=False,blank=False)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.T_Name}'
    


class Screen_M(models.Model):
    Screen_ID  = models.AutoField(primary_key=True)
    Screen_Name = models.CharField(max_length=50,null=False,blank=False,default="Screen X")
    T_ID= models.ForeignKey(Theater_M, on_delete=models.CASCADE,null=False,blank=False, related_name='screens')
    Screen_Total_Seats = models.IntegerField(null=False,blank=False) 

    def __str__(self):
        return f"Theater {str(self.T_ID)} - Screen {self.Screen_Name}"
        # return str(self.T_ID)

class SeatType(models.Model):
    Seat_type_id = models.AutoField(primary_key=True)
    Seat_type_Name = models.CharField(max_length=50,null=False,blank=False)

    def __str__(self):
        return self.Seat_type_Name
    
class Seat_M(models.Model): #add showtime id to fatch 
    Seat_ID  = models.AutoField(primary_key=True)
    Seat_Row_Num =models.IntegerField(null=False,blank=False,default=0) # To acces Row Numner e.g. 1,2,3,4
    Seat_Col_Num =models.IntegerField(null=False,blank=False,default=0) # To acces Column Numner e.g. 1,2,3,4
    Seat_Row_AlphaBet = models.CharField(max_length=5,null=False,blank=False)  # To acces Row in Alphabet e.g. A,B,C,D 
    Screen_ID= models.ForeignKey(Screen_M, on_delete=models.CASCADE,null=False,blank=False)
    Seat_Type= models.ForeignKey(SeatType, on_delete=models.CASCADE,null=False,blank=False)

    def __str__(self):
        return f"Seat {self.Seat_Row_Num}/{self.Seat_Col_Num} - Screen = {self.Screen_ID.Screen_Name} - Seat Type {self.Seat_Type}"


class ShowTime_M(models.Model):
    ShowTime_ID  = models.AutoField(primary_key=True)
    M_ID= models.ForeignKey(Movie_M, on_delete=models.CASCADE,null=False,blank=False)
    # M_Language_ID= models.ForeignKey(Movie_Language, on_delete=models.CASCADE,default=1)
    Screen_M= models.ForeignKey(Screen_M, on_delete=models.CASCADE,null=False,blank=False, related_name='showtimes')
    StartTime = models.TimeField(null=False,blank=False)
    Date = models.DateField(null=False,blank=False)

    # def save(self, *args, **kwargs):
    #     # If M_Language_ID is not set, try to set it based on the selected M_ID
    #     if not self.M_Language_ID:
    #         try:
    #             movie_language = Movie_Language.objects.get(M_ID=self.M_ID)
    #             self.M_Language_ID = movie_language
    #             print(f'Successfully set M_Language_ID to {movie_language.Language_ID}')
    #         except Movie_Language.DoesNotExist:
    #             print('Movie_Language does not exist for the selected M_ID')

    #     super().save(*args, **kwargs)


    def __str__(self):
        return f"Showtime id = {self.ShowTime_ID} - Movie = {self.M_ID} - Screen = {self.Screen_M} - Starttime = {self.StartTime} - Date = {self.Date}"


class SeatInShowtime(models.Model):
    seat = models.ForeignKey(Seat_M, on_delete=models.CASCADE)
    showtime = models.ForeignKey(ShowTime_M, on_delete=models.CASCADE)
    is_booked = models.BooleanField(default=False)

    def __str__(self):
            return f"showtime = {self.showtime} - seat = {self.seat}"

class SeatPrice(models.Model):
    SeatPrice_ID  = models.AutoField(primary_key=True)
    Seat_type_id= models.ForeignKey(SeatType, on_delete=models.CASCADE,null=False,blank=False)
    ShowTime_ID= models.ForeignKey(ShowTime_M, on_delete=models.CASCADE,null=False,blank=False)
    Price = models.DecimalField(max_digits=5,decimal_places=2)

    def __str__(self):
        return f" Seat Type = {self.Seat_type_id} - Showtime = {self.ShowTime_ID} - Price {self.Price}  "

class Payment_Mode(models.Model):
    Payment_Mode_ID  = models.AutoField(primary_key=True)
    Payment_Mode_Name = models.CharField(max_length=50,null=False,blank=False)

    def __str__(self):
        return self.Payment_Mode_Name

class Booking_M(models.Model):
    B_ID  = models.AutoField(primary_key=True)
    User_ID= models.ForeignKey(User, on_delete=models.CASCADE,null=False,blank=False)
    ShowTime_ID= models.ForeignKey(ShowTime_M, on_delete=models.CASCADE,null=False,blank=False)
    B_Time = models.TimeField(null=False,blank=False)
    B_Date = models.DateField(null=False,blank=False)
    SubTotal = models.DecimalField(max_digits=10,decimal_places=2)
    Payment_Mode_ID= models.ForeignKey(Payment_Mode, on_delete=models.CASCADE,null=False,blank=False)
    # gst_rate = models.DecimalField(max_digits=5, decimal_places=2)
    gst_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    TotalAmt = models.DecimalField(max_digits=10,decimal_places=2,blank=True, null=True)
    # Rate_Movie = models.CharField(max_length=5,null=True,blank=True)

    def calculate_gst(self):
        gst_rate = 10
        # Calculate GST from the subtotal using the provided GST rate
        self.gst_amount = (self.SubTotal * gst_rate) / 100

        # Calculate the total by adding GST to the subtotal
        self.TotalAmt = self.SubTotal + self.gst_amount

    def save(self, *args, **kwargs):
        # Before saving, calculate GST and total
        self.calculate_gst()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Invoice {self.pk}: Subtotal - {self.SubTotal}, GST - {self.gst_amount}, Total - {self.TotalAmt}"

class  Booking_Seat_M(models.Model):
    Booking_Seat_ID  = models.AutoField(primary_key=True)
    B_ID  = models.ForeignKey(Booking_M, on_delete=models.CASCADE,null=False,blank=False)
    Seat_ID  = models.ForeignKey(Seat_M, on_delete=models.CASCADE,null=False,blank=False)

    def __str__(self):
        return f"{self.B_ID} - {self.Seat_ID}"

class  Complaint_MB(models.Model):
    Complaint_ID  = models.AutoField(primary_key=True)
    User_ID  = models.ForeignKey(User, on_delete=models.CASCADE,null=False,blank=False)
    M_ID  = models.ForeignKey(Movie_M, on_delete=models.CASCADE,null=True,blank=True)
    T_ID  = models.ForeignKey(Theater_M, on_delete=models.CASCADE,null=True,blank=True)
    Complaint_Desc = models.TextField(null=False,blank=False)
    Complaint_Date = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.Complaint_ID} - {self.User_ID}"
    
