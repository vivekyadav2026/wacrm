import shutil
import json

# Paths
uploaded_image_path = r"C:/Users/ranje/.gemini/antigravity/brain/c980d255-e312-4cf1-b8f7-2d9219080739/.user_uploaded/media_1791151915806.jpg"
logo_dest = "public/logo.jpg"
icon_dest = "src/app/icon.jpg"

# 1. Copy Images
shutil.copy(uploaded_image_path, logo_dest)
shutil.copy(uploaded_image_path, icon_dest)

print("Images copied.")

# 2. Update en.json
en_json_path = "messages/en.json"
with open(en_json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

if data.get("Sidebar", {}).get("title") == "Foundida Whatsapp CRM":
    data["Sidebar"]["title"] = "Foundida"

# Also update meta descriptions if any
for section in data:
    for key in data[section]:
        if isinstance(data[section][key], str):
            data[section][key] = data[section][key].replace("Foundida Whatsapp CRM", "Foundida")

with open(en_json_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
print("Updated en.json")
