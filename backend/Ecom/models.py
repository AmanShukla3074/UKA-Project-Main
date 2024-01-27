from django.db import models
from account.models import User

class Categories(models.Model):
    Categories_ID = models.AutoField(primary_key=True)
    Categories_Name = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.Categories_Name

class Product_Color_M(models.Model):
    Color_ID=models.AutoField(primary_key=True)
    Color_Name = models.CharField(max_length=24)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.Color_Name 
    
class Product_M(models.Model):
    P_ID = models.AutoField(primary_key=True)
    P_Name = models.CharField(max_length=90)
    P_Desc = models.TextField(null=True,blank=True)
    P_Price = models.DecimalField(max_digits=12,decimal_places=2)
    Category = models.ForeignKey(Categories, on_delete=models.CASCADE)
    Color = models.ForeignKey(Product_Color_M, on_delete=models.CASCADE,null=True,blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.P_Name
  

class Product_Size_M(models.Model):
    Size_ID=models.AutoField(primary_key=True)
    Size_Name = models.CharField(max_length=8)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.Size_Name   


class Product_Size(models.Model):
    P_Size_ID=models.AutoField(primary_key=True)
    Product_ID = models.ForeignKey(Product_M, on_delete=models.CASCADE,null=True,blank=True)
    size = models.ForeignKey(Product_Size_M, on_delete=models.CASCADE)
    Stock = models.IntegerField(default=0)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.Product_ID.P_Name} - {self.size.Size_Name}"  

class Product_Img(models.Model):
    Img_id = models.AutoField(primary_key=True)
    Product_ID = models.ForeignKey(Product_M, on_delete=models.CASCADE,null=True)
    img = models.ImageField(upload_to='product_images/',default='default_image.jpg')

    def get_img_url(self):
        return self.img.url
    def __str__(self):
        return f'{self.Product_ID.P_Name} - {self.img.name}'


# class Cart_M(models.Model):
#     Cart_ID = models.AutoField(primary_key=True)
#     User_ID = models.OneToOneField(User, on_delete=models.CASCADE)
#     total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)


# class Cart_Details(models.Model):
#     Card_Detail_ID = models.AutoField(primary_key=True)
#     Cart_ID = models.ForeignKey(Cart_M, on_delete=models.CASCADE, related_name='cart_items')
#     Product_ID = models.ForeignKey(Product_M, on_delete=models.CASCADE)
#     ItemQuantity = models.PositiveIntegerField(default=1)
#     SubTotal = models.DecimalField(max_digits=10, decimal_places=2)
#     Size = models.ForeignKey(Product_Size_M, on_delete=models.SET_NULL, null=True, blank=True)

#     def __str__(self):
#         return f" {self.Product_ID.P_Name} - {self.ItemQuantity} - ({self.Size.Size_Name if self.Size else 'No Size'}) in Cart"