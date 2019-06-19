﻿Запуск приложения npm start в корневой папке

Структура:
Компоненты и работа с сервером разделены.
Приложение разбито на пять компонентов.

App - Оотвечает за общую структуру приложения
descr - диалоговое окно с описанием канала/передачи. Вынесено в отдельный компнент, так как используется неоднократно.
header - заголовок страница. Содержит меню выбора города. 
menu - список всех каналов, вещающих в данном городе. убраны дубликаты.
programGuide - список передач канала на сутки, начиная с времени на 3 часа раньше текущего. Красным выделена текущая программа, синим - следующая. По у молчанию отображается 10 передач. Можно отобразить весь список.


Верстка произведена с использованием сетки flexboxgrid. Так как она легче бутстрепа.

Взаимодействие компонентов приложения идет при помоши redux