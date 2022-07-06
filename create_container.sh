docker build -t pdf_compressor_image .
docker run -dit -p 9012:3000 --name pdf_compressor_container pdf_compressor_image