# Generated by Django 3.2 on 2022-12-26 16:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0003_alter_dollidolstid_lstfilepathimg'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dollidolstid',
            name='create_date',
            field=models.DateTimeField(default='2022-12-26 16:40:32'),
        ),
        migrations.AlterField(
            model_name='dollidolstid',
            name='lstcontent',
            field=models.CharField(blank=True, default='', max_length=500, verbose_name='특이사항'),
        ),
    ]