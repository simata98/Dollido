# Generated by Django 3.2 on 2022-12-22 07:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dollidolstid',
            name='clrNm',
            field=models.CharField(blank=True, max_length=10),
        ),
    ]
