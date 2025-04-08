import json

# Завантажуємо обидва JSON файли
with open('HeroData(c+l).json', 'r', encoding='utf-8') as f1:
    first_file_data = json.load(f1)

with open('heroData(s).json', 'r', encoding='utf-8') as f2:
    second_file_data = json.load(f2)


    # Проходимо по 126 елементах
for i in range(126):  # Для забезпечення однакової кількості елементів
        # Додаємо поля з першого файлу до другого
        hero_name_first = list(first_file_data.keys())[i]
        hero_name_second = list(second_file_data.keys())[i]

        # Додаємо вміст з першого файлу в другий
        first_file_data[hero_name_first]['role'] = second_file_data[hero_name_second]['role']
        first_file_data[hero_name_first]['laning_with'] = second_file_data[hero_name_second]['laning_with']
        first_file_data[hero_name_first]['playing_with'] = second_file_data[hero_name_second]['playing_with'] 
    # Записуємо результат назад у перший файл

with open('Hero_data.json', 'w', encoding='utf-8') as f1:
    json.dump(first_file_data, f1, indent=4, ensure_ascii=False)

print("Файл успішно оновлено.")


        
