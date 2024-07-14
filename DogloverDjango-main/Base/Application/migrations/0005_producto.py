# Generated by Django 5.0.6 on 2024-06-24 23:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Application', '0004_alumno_foto_url'),
    ]

    operations = [
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('descripcion', models.TextField()),
                ('tipo_producto', models.CharField(choices=[('accesorio', 'Accesorio'), ('alimento', 'Alimento')], max_length=10)),
                ('precio', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
    ]
