from django.contrib import admin
from .models import *

admin.site.register(Product_M)
admin.site.register(Categories)
admin.site.register(Product_Color_M)
admin.site.register(Product_Size_M)
admin.site.register(Product_Size)
admin.site.register(Product_Img)
admin.site.register(Product_RateReview_M)
admin.site.register(Status_M)
admin.site.register(Offer_M)
# admin.site.register(Order_M)
# admin.site.register(Order_Details)
# admin.site.register(Payment_M)
# admin.site.register(Refund)
admin.site.register(Reminder_M)
admin.site.register(Wishlist_M)
admin.site.register(Wishlist_Details)