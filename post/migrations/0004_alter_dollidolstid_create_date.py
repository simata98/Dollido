# Generated by Django 3.2 on 2023-01-02 00:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0003_auto_20230102_0034'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dollidolstid',
            name='create_date',
            field=models.DateTimeField(default='2023-01-02 00:44:00'),
        ),
    ]