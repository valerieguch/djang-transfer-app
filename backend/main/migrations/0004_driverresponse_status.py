# Generated by Django 4.2.1 on 2023-05-23 11:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_alter_driverresponse_unique_together'),
    ]

    operations = [
        migrations.AddField(
            model_name='driverresponse',
            name='status',
            field=models.CharField(choices=[('a', 'Approved by user'), ('n', 'Not approved')], default='n', max_length=1),
        ),
    ]
