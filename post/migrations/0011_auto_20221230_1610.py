# Generated by Django 3.2 on 2022-12-30 16:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0010_alter_dollidolstid_create_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dollidolstid',
            name='create_date',
            field=models.DateTimeField(default='2022-12-30 16:10:45'),
        ),
        migrations.AlterField(
            model_name='dollidolstid',
            name='lstYmd',
            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='습득일자'),
        ),
    ]
