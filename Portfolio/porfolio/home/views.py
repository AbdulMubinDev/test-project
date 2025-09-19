from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'landing/home.html')

def about(request):
    return render(request, 'about/about.html')

def contact(request):
    return render(request, 'contact/contact.html')

def portfolio(request):
    return render(request, 'portfolio/portfolio.html')