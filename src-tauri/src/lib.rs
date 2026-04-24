// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn bonjour_suzie() -> String {
    "bonjour suzie !".to_string()
}

#[tauri::command]
fn fermer_app(window: tauri::Window) {
    window.close().unwrap();
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            bonjour_suzie,
            fermer_app
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
