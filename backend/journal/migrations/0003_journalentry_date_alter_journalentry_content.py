# Generated by Django 4.2.4 on 2023-10-22 03:31

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('journal', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='journalentry',
            name='date',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='journalentry',
            name='content',
            field=models.TextField(blank=True, null=True),
        ),
    ]
