#!/bin/bash

# Nombre del archivo donde se guardará el contenido
output_file="all_files_except_package_lock_and_git.txt"

# Crear o vaciar el archivo de salida
> "$output_file"

# Buscar archivos, excluyendo los de .git, package-lock.json, node_modules y el archivo de salida
find . -type f \
    ! -name 'package-lock.json' \
    ! -path '*/.git/*' \
    ! -path '*/node_modules/*' \
    ! -name "$output_file" | while read -r file; do
    
    echo "--- File: $file ---" >> "$output_file"
    
    # Agregar el contenido solo si es texto
    if file "$file" | grep -q 'text'; then
        cat "$file" >> "$output_file"
    else
        echo "[Non-text file skipped]" >> "$output_file"
    fi
    echo -e "\n" >> "$output_file"
done

echo "Contenido de los archivos guardado en $output_file"
