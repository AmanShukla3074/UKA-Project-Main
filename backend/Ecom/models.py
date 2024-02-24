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
    

# class Product_RateReview_M(models.Model):
#     Rate_ID = models.AutoField(primary_key=True)
#     P_ID = models.ForeignKey(Product_M, on_delete=models.CASCADE, null=False)
#     User_ID = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
#     Rate = models.CharField(max_length=5, null=False)
#     Review=models.TextField(null=False)
#     RateReview_Date = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f" {self.Rate_ID} - {self.P_ID.P_Name} - {self.Rate} - {self.Review}"
    
class Status_M(models.Model):
    Status_ID = models.AutoField(primary_key=True)
    Status_Name = models.CharField(max_length=20, null=False)

    def __str__(self):
        return self.Status_Name
    
    from django.db import models

class Offer_M(models.Model):
    Offer_ID = models.AutoField(primary_key=True)
    Offer_Title = models.CharField(max_length=50, null=False)
    Offer_Desc = models.CharField(max_length=120, null=False)
    DiscountPercentage = models.IntegerField(null=False)
    MaximumDiscount = models.IntegerField(null=True) 
    MinimumTotalAmt = models.IntegerField(null=True) 
    MinimumProduct = models.IntegerField(null=True)
    StartDate = models.DateField(null=False)
    EndDate = models.DateField(null=False)

    def __str__(self):
        return self.Offer_Title

# class Order_M(models.Model):
#     Order_ID = models.AutoField(primary_key=True) 
#     User_ID = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
#     Order_Date = models.DateField(null=False)
#     Total_Amt = models.DecimalField(max_digits=10, decimal_places=2, null=False)
#     Status_ID = models.ForeignKey(Status_M, on_delete=models.CASCADE, null=False)
#     DelP_ID = models.ForeignKey(User_ID, on_delete=models.CASCADE, null=True)
#     Delivered_Date = models.DateField(null=True)

# class Order_Details(models.Model):
#     Order_Detail_ID = models.AutoField(primary_key=True)
#     P_Size_ID = models.ForeignKey(Product_Size, on_delete=models.CASCADE, null=False)
#     Order_ID = models.ForeignKey(Order_M, on_delete=models.CASCADE, null=False)
#     SubTotal = models.DecimalField(max_digits=10, decimal_places=2, null=False)
#     Qty = models.IntegerField(null=False)
#     Offer_ID=models.ForeignKey(Offer_M,on_delete=models.CASCADE, null=False)

#     def __str__(self):
#         return self.Order_Detail_ID

'''



'''

class Payment_Mode(models.Model):
    Payment_Mode_ID = models.AutoField(primary_key=True)
    Payment_Mode_Name = models.CharField(max_length=20, null=False)

    def __str__(self):
        return self.Payment_Mode_Name

# class Payment_M(models.Model):
#     Transcation_ID = models.AutoField(primary_key=True)
#     Order_ID = models.ForeignKey(Order_M, on_delete=models.CASCADE, null=False)
#     Payment_Mode_ID = models.ForeignKey(Payment_Mode, on_delete=models.CASCADE, null=False)
#     Payment_Amt = models.DecimalField(max_digits=10, decimal_places=2, null=False)
#     Payment_Time = models.TimeField(null=False)
#     Payment_Date = models.DateField(null=False)

#     def __str__(self):
#         return f"Transaction ID: {self.Transcation_ID}"
    
# class Refund(models.Model):
#     Refund_ID = models.AutoField(primary_key=True)
#     Order_Detail_ID = models.ForeignKey(Order_Details, on_delete=models.CASCADE, null=False)
#     Refund_Reason = models.CharField(max_length=250, null=False)
#     Status_ID = models.ForeignKey(Status_M, on_delete=models.CASCADE, null=True)
#     Refund_Date = models.DateField(null=False)
#     Processed_Date = models.DateField(null=True)
#     Refund_Amt = models.IntegerField(null=True)

#     def __str__(self):
#         return f"Refund ID: {self.Refund_ID}"
    
class Reminder_M(models.Model):
    Reminder_ID = models.AutoField(primary_key=True)
    User_ID = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    Product_Size_ID = models.ForeignKey(Product_Size, on_delete=models.CASCADE, null=False)
    Reminder_Date = models.DateField(null=False)

    def __str__(self):
        return f"Reminder ID: {self.Reminder_ID}"
    
class Wishlist_M(models.Model):
    Wishlist_ID = models.AutoField(primary_key=True)
    User_ID = models.ForeignKey(User, on_delete=models.CASCADE, null=False)

    def __str__(self):
        return f"Wishlist ID: {self.Wishlist_ID}"

class Wishlist_Details(models.Model):
    Wishlist_Item_ID = models.AutoField(primary_key=True)
    Wishlist_ID = models.ForeignKey(Wishlist_M, on_delete=models.CASCADE, null=False, related_name='wishlist_items')
    P_ID = models.ForeignKey(Product_M, on_delete=models.CASCADE, null=False)

    def __str__(self):
        return f"Wishlist Item ID: {self.Wishlist_Item_ID}"