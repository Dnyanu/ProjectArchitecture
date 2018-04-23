using DataBaseConfiguration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.Gemino.DataAccessLayer.Security
{
    public static class SecurityDAL
    {
        public static Aes Create()
        {
            Aes objAes = Aes.Create();
            RijndaelManaged myAlg = new RijndaelManaged();
            byte[] salt = Encoding.ASCII.GetBytes(GenericSP.Key);
            Rfc2898DeriveBytes key = new Rfc2898DeriveBytes(GenericSP.Key, salt);
            objAes.Key = key.GetBytes(myAlg.KeySize / 8);
            objAes.IV = key.GetBytes(myAlg.BlockSize / 8);
            return objAes;
        }
        public static string EncryptString(string plainText)
        {
            string str = "";
            if (!string.IsNullOrEmpty(plainText))
            {
                Aes objAes = Create();
                byte[] encrypted;
                // Create an Aes object with the specified key and IV.
                using (Aes aesAlg = Aes.Create())
                {
                    aesAlg.Key = objAes.Key;
                    aesAlg.IV = objAes.IV;
                    // Create a ecrytor to perform the stream transform.
                    ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);
                    // Create the streams used for encryption.
                    using (MemoryStream msEncrypt = new MemoryStream())
                    {
                        using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                        {
                            using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
                            {
                                //Write all data to the stream.
                                swEncrypt.Write(plainText);
                            }
                            encrypted = msEncrypt.ToArray();
                            str = Convert.ToBase64String(encrypted);
                        }
                    }
                }
            }
            // Return the encrypted bytes from the memory stream.
            return str;
        }
        public static string DecryptString(string Text)
        {
            string plaintext = "";
            if (!string.IsNullOrEmpty(Text))
            {
                Aes objAes = Create();
                byte[] cipherText = Convert.FromBase64String(Text);
                // Create an Aes object with the specified key and IV.
                using (Aes aesAlg = Aes.Create())
                {
                    aesAlg.Padding = PaddingMode.PKCS7;
                    aesAlg.Key = objAes.Key;
                    aesAlg.IV = objAes.IV;
                    // Create a decrytor to perform the stream transform.
                    ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);

                    // Create the streams used for decryption.
                    using (MemoryStream msDecrypt = new MemoryStream(cipherText))
                    {
                        using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {
                            using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                            {
                                // Read the decrypted bytes from the decrypting stream and place them in a string.
                                plaintext = srDecrypt.ReadToEnd();
                            }
                        }
                    }
                }
            }
            return plaintext;
        }
    }
}
