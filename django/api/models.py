from django.db import models
from datetime import datetime


class Task(models.Model):

    # We're using Enums for status since it can have 3 states.
    class Status(models.TextChoices):
        DONE = 'Done'
        ONGOING = 'On Going'
        EXCEEDED = 'Exceeded',

    description = models.CharField(max_length=256)
    startDate = models.DateField(default=datetime.today)
    endDate = models.DateField(default=datetime.today)
    status = models.CharField(
        max_length=10, choices=Status.choices, default=Status.ONGOING)

    # We can just change the status while saving if the time has exceeded.
    def save(self, *args, **kwargs):
        if(self.endDate < datetime.now().date()):
            self.status = "Exceeded"
        super().save(*args, **kwargs)

    # Displaying our tasks on the admin panel correctly.
    def __str__(self):
        return f'Task: {self.description} {self.endDate} {self.status}'

    # The order of items are first listed on their end dates, and then their statuses.´
    # I've overriden the database table name to be 'tasks' 
    class Meta:
        ordering = ['-status', 'endDate']
        db_table = 'tasks'
