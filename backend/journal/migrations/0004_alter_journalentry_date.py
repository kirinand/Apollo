# Generated by Django 4.2.4 on 2023-10-23 07:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('journal', '0003_journalentry_date_alter_journalentry_content'),
    ]

    operations = [
        migrations.AlterField(
            model_name='journalentry',
            name='date',
            field=models.DateField(unique=True),
        ),
    ]