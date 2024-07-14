from django.db import models
from django.contrib.auth.models import User

class Producto(models.Model):
    TIPO_PRODUCTO_CHOICES = [
        ('accesorio', 'Accesorio'),
        ('alimento', 'Alimento'),
    ]
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    tipo_producto = models.CharField(max_length=10, choices=TIPO_PRODUCTO_CHOICES)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    foto_url = models.URLField(max_length=200, blank=True, null=True)
    def __str__(self):
        return self.nombre

    
class Carrito(models.Model):
    cliente = models.ForeignKey(User, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.cliente.username} - {self.producto.nombre}"
 
    