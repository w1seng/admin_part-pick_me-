from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import json
import time

# Ініціалізація браузера
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("https://www.dotarecaps.com/synergy")
time.sleep(3)  # Чекаємо, щоб сторінка завантажилася

# Читаємо імена героїв з файлу
with open("heroNames.txt", "r", encoding="utf-8") as file:
    hero_names = [line.strip() for line in file.readlines()]

data = {}

# Опрацьовуємо всіх героїв
for hero in hero_names[126:]:
    try:
        role =[]
        print(f"Обробка героя: {hero}")
        
        # Знаходимо пошуковий інпут і вводимо ім'я героя
        search_input = driver.find_element(By.XPATH, "//input[@placeholder='Search Hero']")
        search_input.clear()
        search_input.send_keys(hero)
        time.sleep(1)
        search_input.send_keys(Keys.RETURN)
        time.sleep(3)  # Чекаємо завантаження результатів пошуку
        
        # Натискаємо на героя в списку результатів
        hero_links = driver.find_elements(By.XPATH, "//a")
        hero_clicked = False
        for link in hero_links:
            if hero.lower() in link.text.lower():
                link.click()
                hero_clicked = True
                time.sleep(3)
                break
        
        if not hero_clicked:
            print(f"Не вдалося знайти або натиснути на {hero}")
            continue

        # Натискання "Show More Heroes", поки кнопка є (перед обробкою таблиць)
        while True:
            try:
                show_more_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Show More Heroes')]")
                show_more_button.click()
                time.sleep(2)  # Чекаємо завантаження нових героїв
            except:
                break  # Якщо кнопки більше немає, виходимо з циклу

        # Отримуємо всі таблиці <tbody class="border-b border-gray-700">
        tables = driver.find_elements(By.XPATH, "//tbody[@class='border-b border-gray-700']")

        # Словники для збереження даних
        laning_with_stats = {}
        playing_with_stats = {}

        # Обробка лівої таблиці (якщо є)
        if len(tables) > 1:
            print(f"Ліва таблиця знайдена для {hero}")
            left_table_rows = tables[0].find_elements(By.TAG_NAME, "tr")

            for row in left_table_rows:
                cols = row.find_elements(By.TAG_NAME, "td")
                if len(cols) >= 5:  # Має бути хоча б 5 колонок
                    hero_name = cols[1].text.strip()  # 2-й <td>
                    lane_winrate = cols[4].text.strip()  # 5-й <td>
                    laning_with_stats[hero_name] = lane_winrate

        # Обробка правої таблиці (або 2-ї, або 1-ї, якщо лівої немає)
        right_table_index = 1 if len(tables) > 1 else 0

        print(f"Обробляємо праву таблицю для {hero} (індекс {right_table_index})")
        right_table_rows = tables[right_table_index].find_elements(By.TAG_NAME, "tr")

        for row in right_table_rows:
            cols = row.find_elements(By.TAG_NAME, "td")
            if len(cols) >= 3:  # Має бути хоча б 3 колонки
                hero_name = cols[1].text.strip()  # 2-й <td>
                winrate = cols[2].text.strip()  # 3-й <td>
                playing_with_stats[hero_name] = winrate

        try:
    # Шукаємо div-контейнер, де має бути кнопка
            button_container = driver.find_element(By.XPATH, "//div[contains(@class, 'mb-4') and contains(@class, 'buttoncenter')]")
    
    # Шукаємо кнопку за значенням value всередині контейнера
            button = button_container.find_element(By.XPATH, ".//button[@value='POSITION_1']")

            role.append("1")
        except :
            print("Кнопка 1 не знайдена")
        
        try:
    # Шукаємо div-контейнер, де має бути кнопка
            button_container = driver.find_element(By.XPATH, "//div[contains(@class, 'mb-4') and contains(@class, 'buttoncenter')]")
    
    # Шукаємо кнопку за значенням value всередині контейнера
            button = button_container.find_element(By.XPATH, ".//button[@value='POSITION_2']")

            role.append("2")
        except :
            print("Кнопка 2 не знайдена")
        
        try:
    # Шукаємо div-контейнер, де має бути кнопка
            button_container = driver.find_element(By.XPATH, "//div[contains(@class, 'mb-4') and contains(@class, 'buttoncenter')]")
    
    # Шукаємо кнопку за значенням value всередині контейнера
            button = button_container.find_element(By.XPATH, ".//button[@value='POSITION_3']")

            role.append("3")
        except :
            print("Кнопка 3 не знайдена")   

        try:
    # Шукаємо div-контейнер, де має бути кнопка
            button_container = driver.find_element(By.XPATH, "//div[contains(@class, 'mb-4') and contains(@class, 'buttoncenter')]")
    
    # Шукаємо кнопку за значенням value всередині контейнера
            button = button_container.find_element(By.XPATH, ".//button[@value='POSITION_4']")

            role.append("4")
        except :
            print("Кнопка 4 не знайдена")   

        try:
    # Шукаємо div-контейнер, де має бути кнопка
            button_container = driver.find_element(By.XPATH, "//div[contains(@class, 'mb-4') and contains(@class, 'buttoncenter')]")
    
    # Шукаємо кнопку за значенням value всередині контейнера
            button = button_container.find_element(By.XPATH, ".//button[@value='POSITION_5']")

            role.append("5")
        except:
            print("Кнопка 5 не знайдена")  


        # Збереження даних
        data[hero] = {
            "role": role,
            "laning_with": laning_with_stats,
            "playing_with": playing_with_stats
        }

        print(f"Обробка {hero} завершена")

        # Повертаємося на головну сторінку
        driver.get("https://www.dotarecaps.com/synergy")
        time.sleep(3)

    except Exception as e:
        print(f"Помилка при обробці {hero}: {e}")
    
    time.sleep(2)  # Затримка перед наступним героєм

# Збереження в JSON
print("Збереження даних у herosynergies.json")
with open("heroData(s).json", "w", encoding="utf-8") as json_file:
    json.dump(data, json_file, indent=4, ensure_ascii=False)

# Закриваємо браузер
driver.quit()
print("Дані збережено у hero_synergies.json")