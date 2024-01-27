from django.db import models
from account.models import User

# Create your models here.
class MS_Genre_M(models.Model):
    MS_Genre_ID=models.AutoField(primary_key=True)
    Genre_Name=models.CharField(max_length=50,null=False,blank=False)

    def __str__(self):
        return self.Genre_Name

class Artist_M(models.Model):
    Artist_ID=models.AutoField(primary_key=True)
    User_ID=models.ForeignKey(User, on_delete=models.CASCADE,null=False,blank=False)
    Bio=models.CharField(max_length=70)
    Artist_Name=models.CharField(max_length=30,null=False,blank=False)
    Date_Joined=models.DateField(null=False,blank=False)
    MS_Genre_ID=models.ForeignKey(MS_Genre_M, on_delete=models.CASCADE,null=False,blank=False)

    def __str__(self):
            return f"Artist_ID = {self.Artist_ID} - Artist_Name = {self.Artist_Name}"

class Album_M(models.Model):
    Album_ID=models.AutoField(primary_key=True)
    Album_Title=models.CharField(max_length=50,null=False,blank=False)
    ReleaseDate=models.DateField(null=False,blank=False)
    MS_Genre_ID=models.ForeignKey(MS_Genre_M, on_delete=models.CASCADE,null=False,blank=False)
    No_Of_Songs=models.IntegerField(null=False,blank=False)
    Copyrightowner=models.CharField(max_length=50)
 
    def __str__(self):
            return f"Album_ID = {self.Album_ID} - Album_Title = {self.Album_Title}"

class Music_M(models.Model):
    Music_ID=models.AutoField(primary_key=True)
    Music_Title=models.CharField(max_length=50,null=False,blank=False)
    Release_Date=models.DateField(null=False,blank=False)
    MS_Genre_ID=models.ForeignKey(MS_Genre_M, on_delete=models.CASCADE,null=False,blank=False)
    Album_ID=models.ForeignKey(Album_M, on_delete=models.CASCADE,null=True,blank=True)
    Copyrightowner=models.CharField(max_length=50)
    file = models.FileField(upload_to='music/')
    M_Streams=models.IntegerField(null=True,blank=True)

    def __str__(self):
            return f"Music_ID = {self.Music_ID} - Music_Title = {self.Music_Title}"

class Playlist_M(models.Model):
    Playlist_ID=models.AutoField(primary_key=True)
    User_ID=models.ForeignKey(User, on_delete=models.CASCADE,null=False,blank=False)
    Playlist_Title=models.CharField(max_length=50,null=False,blank=False)
    P_Created_Date=models.DateField(null=False,blank=False)

    def __str__(self):
            return f"Playlist_ID = {self.Playlist_ID} - Playlist_Title = {self.Playlist_Title}"


class Playlist_Music_M(models.Model):
    PlaylistMusic_ID=models.AutoField(primary_key=True)
    Playlist_ID=models.ForeignKey(Playlist_M, on_delete=models.CASCADE,null=False,blank=False)
    Music_ID=models.ForeignKey(Music_M, on_delete=models.CASCADE,null=False,blank=False)

    def __str__(self):
            return f"PlaylistMusic_ID = {self.PlaylistMusic_ID} - Playlist_ID = {self.Playlist_ID} - Music_ID = {self.Music_ID}"

    
class Music_Artist(models.Model):
    M_Artist_ID=models.AutoField(primary_key=True)
    Music_ID=models.ForeignKey(Music_M, on_delete=models.CASCADE,null=False,blank=False)
    Artist_ID=models.ForeignKey(Artist_M, on_delete=models.CASCADE,null=False,blank=False)

    def __str__(self):
            return f"M_Artist_ID = {self.M_Artist_ID} - Music_ID = {self.Music_ID} - Artist_ID = {self.Artist_ID}"


class Album_Artist(models.Model):
    A_Artist_ID=models.AutoField(primary_key=True)
    Album_ID=models.ForeignKey(Album_M, on_delete=models.CASCADE,null=False,blank=False)
    Artist_ID=models.ForeignKey(Artist_M, on_delete=models.CASCADE,null=False,blank=False)

    def __str__(self):
            return f"A_Artist_ID = {self.A_Artist_ID} - Album_ID = {self.Album_ID} - Artist_ID = {self.Artist_ID}"

class Analytics_M(models.Model):
    Analytics=models.AutoField(primary_key=True)
    Artist_ID=models.ForeignKey(Artist_M, on_delete=models.CASCADE,null=False,blank=False)
    Month_Year=models.CharField(max_length=16,null=False,blank=False)
    TotalStreams=models.IntegerField(null=False,blank=False)

    def __str__(self):
            return f"Analytics = {self.Analytics} - Artist_ID = {self.Artist_ID}"