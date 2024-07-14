from django.shortcuts import render, redirect,  get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate, update_session_auth_hash
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from .models import Producto, Carrito
from .forms import SignUpForm, UserEditForm, ProductoForm, UserEditForm, CustomPasswordChangeForm

# Links
def carrito(request):
    return render(request, 'Application/carrito.html')

def index(request):
    return render(request, 'Application/index.html')

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('index') 
    else:
        form = AuthenticationForm()
    
    return render(request, 'Application/login.html', {'form': form})

def alimentos(request):
    productos = Producto.objects.filter(tipo_producto='alimento')
    contexto = {"productos": productos}
    return render(request, 'Application/alimentos.html', contexto)

def accesorios(request):
    productos = Producto.objects.filter(tipo_producto='accesorio')
    contexto = {"productos": productos}
    return render(request, 'Application/accesorios.html', contexto)

def servicios(request):
    return render(request, 'Application/servicios.html')

def about(request):
    return render(request, 'Application/about.html')

def fichas(request):
    return render(request, 'Application/fichas.html')

def calc(request):
    return render(request, 'Application/calc.html')

#Sesiones
@login_required
def menu(request):
    request.session["usuario"]="cgarcia"
    usuario=request.session["usuario"]
    context={'usuario':usuario}
    return render(request,'Application/servicios.html', context)

def home(request):
    context={}
    return render(request,'Application/index.html', context)

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                
                return redirect('login')
    else:
        form = SignUpForm()
    
    return render(request, 'Application/signup.html', {'form': form})

#Lista de usuarios, Añadir, Borrar y Editar

def user_list(request):
    users = User.objects.all()
    return render(request, 'Application/user_list.html', {'users': users})

def delete_user(request, user_id):
    user = get_object_or_404(User, pk=user_id)  
    if request.method == 'POST':
        user.delete()  
        return redirect('user_list')  
    else:
        return redirect('user_list') 
    
def edit_user(request, user_id):
    user = get_object_or_404(User, pk=user_id) 
    if request.method == 'POST':
        form = UserEditForm(request.POST, instance=user)
        if form.is_valid():
            form.save()  
            return redirect('user_list')  
    else:
        form = UserEditForm(instance=user) 
    
    context = {
        'form': form,
        'user_id': user_id,
    }
    return render(request, 'Application/edit_user.html', context)

#PERFIL USUARIO

@login_required
def perfil_usuario(request):
    user = request.user
    context = {
        'nombre': user.first_name,
        'apellido': user.last_name
    }
    return render(request, 'Application/perfil_usuario.html', context)

@login_required
def editar_perfil(request):
    user = request.user
    
    if request.method == 'POST':
        user_form = UserEditForm(request.POST, instance=user)
        password_form = CustomPasswordChangeForm(user, request.POST)

        if 'guardar_cambios' in request.POST:
            if user_form.is_valid():
                user_form.save()
                return redirect('perfil_usuario')

        elif 'cambiar_contrasena' in request.POST:
            if password_form.is_valid():
                password_form.save()
                update_session_auth_hash(request, password_form.user)
                return redirect('perfil_usuario')

    else:
        user_form = UserEditForm(instance=user)
        password_form = CustomPasswordChangeForm(user)

    context = {
        'user_form': user_form,
        'password_form': password_form
    }
    return render(request, 'Application/editar_perfil.html', context)

#TABLA PRODUCTOS

#Mostrar productos
def lista_productos(request):
    productos = Producto.objects.all()
    return render(request, 'Application/lista_productos.html', {'productos': productos})

def agregar_producto(request):
    if request.method == 'POST':
        form = ProductoForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('lista_productos')
    else:
        form = ProductoForm()
    return render(request, 'Application/agregar_producto.html', {'form': form})

def eliminar_producto(request, producto_id):
    producto = get_object_or_404(Producto, id=producto_id)
    if request.method == 'POST':
        producto.delete()
        return redirect('lista_productos')  # Cambia 'lista_productos' por el nombre de tu URL de lista de productos
    return render(request, 'Application/confirmar_eliminacion.html', {'producto': producto})

def editar_producto(request, producto_id):
    producto = get_object_or_404(Producto, id=producto_id)
    if request.method == 'POST':
        form = ProductoForm(request.POST, instance=producto)
        if form.is_valid():
            form.save()
            return redirect('lista_productos')
    else:
        form = ProductoForm(instance=producto)
    return render(request, 'Application/editar_producto.html', {'form': form})

#Carrito
