from django.core.management.base import BaseCommand
from Application.models import Alumno

class Command(BaseCommand):
    help = 'Deletes all records from the Alumno table'

    def handle(self, *args, **kwargs):
        Alumno.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Successfully deleted all records from the Alumno table'))