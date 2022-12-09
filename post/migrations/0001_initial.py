# Generated by Django 3.2 on 2022-12-09 05:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('category_id', models.AutoField(primary_key=True, serialize=False)),
                ('upper_category', models.CharField(max_length=20)),
                ('middle_category', models.CharField(max_length=20)),
                ('lower_category', models.CharField(max_length=20)),
                ('color', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='DollidoLstId',
            fields=[
                ('dollido_lst_id', models.AutoField(primary_key=True, serialize=False)),
                ('lstPrdtNm', models.CharField(default='', max_length=200, null=True)),
                ('lstFilePathImg', models.CharField(max_length=300)),
                ('lstSteNm', models.CharField(max_length=100)),
                ('lstLctNm', models.CharField(max_length=200)),
                ('lstPlace', models.CharField(max_length=100)),
                ('tel', models.CharField(max_length=15)),
                ('orgNm', models.CharField(max_length=100)),
                ('lstYmd', models.DateField(max_length=10)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='post.category')),
            ],
        ),
        migrations.CreateModel(
            name='ApiListId',
            fields=[
                ('atcId', models.CharField(max_length=30, primary_key=True, serialize=False)),
                ('fdPrdtNm', models.CharField(default='', max_length=200, null=True)),
                ('fdFilePathImg', models.CharField(max_length=300)),
                ('fdSbjt', models.CharField(max_length=100)),
                ('depPlace', models.CharField(max_length=30)),
                ('fdYmd', models.DateField(max_length=10)),
                ('clrNm', models.CharField(max_length=10)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='post.category')),
            ],
        ),
    ]
