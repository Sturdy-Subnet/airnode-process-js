import os
import json

def escape_and_replace(content):
    # Replace "${" with "\\${"
    content = content.replace("${", "\\${")

    # Escape the string to be JSON compatible
    escaped_content = json.dumps(content)

    return escaped_content

def process_file(input_path, output_path):
    # Read the file content
    with open(input_path, 'r') as file:
        content = file.read()

    # Process the content
    formatted_content = escape_and_replace(content)

    # Write the processed content back to the output file
    with open(output_path, 'w') as file:
        file.write(formatted_content)

def main():
    # Define the file paths
    files_to_process = ["postprocess.bundle.js", "preprocess.bundle.js"]
    dist_folder = "dist"

    for file_name in files_to_process:
        input_path = os.path.join(dist_folder, file_name)
        output_path = os.path.join(dist_folder, f"formatted_{file_name}")

        # Process each file
        process_file(input_path, output_path)
        print(f"Processed and saved: {output_path}")

if __name__ == "__main__":
    main()
