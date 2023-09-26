# Generated by Django 4.2.4 on 2023-09-26 03:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('journal', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='EmotionLabel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32)),
                ('entries', models.ManyToManyField(related_name='emotion_labels', to='journal.journalentry')),
            ],
        ),
    ]