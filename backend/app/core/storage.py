from supabase import create_client, Client
from .config import settings

class SupabaseStorage:
    def __init__(self):
        self.client: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        self.bucket_name = "biliardino-assets"

    def upload_file(self, file_content: bytes, file_name: str, folder: str = "squadre") -> str:
        """
        Uploads a file to Supabase storage and returns the public URL.
        """
        path = f"{folder}/{file_name}"
        # Upload file (upsert=True replaces existing file with same name)
        self.client.storage.from_(self.bucket_name).upload(
            path=path,
            file=file_content,
            file_options={"content-type": "image/jpeg", "upsert": "true"}
        )

        # Get the public URL
        return self.client.storage.from_(self.bucket_name).get_public_url(path)

    def delete_file(self, file_name: str, folder: str = "squadre"):
        """
        Deletes a file from Supabase storage.
        """
        path = f"{folder}/{file_name}"
        self.client.storage.from_(self.bucket_name).remove([path])

storage_service = SupabaseStorage()
