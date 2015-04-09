using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace BallyglassWebApi.Controllers
{
    public class EncryptDecrypt
    {
        private static byte[] key = { 123, 217, 19, 11, 24, 26, 85, 45, 114, 184, 27, 162, 37, 112, 222, 209, 241, 24, 175, 144, 173, 53, 196, 29, 24, 26, 17, 218, 131, 236, 53, 209 };
        private static byte[] vector = { 146, 64, 191, 111, 23, 3, 113, 119, 231, 121, 221, 112, 79, 32, 114, 156 };
        private ICryptoTransform encryptor, decryptor;
        

        public EncryptDecrypt()
        {
            RijndaelManaged rm = new RijndaelManaged();
            encryptor = rm.CreateEncryptor(key, vector);
            decryptor = rm.CreateDecryptor(key, vector);
            
        }

        public static string Encrypt(string unencrypted)
        {
            EncryptDecrypt ed = new EncryptDecrypt();
            var encoder = new ASCIIEncoding();
            return Convert.ToBase64String(ed.Encrypt(encoder.GetBytes(unencrypted)));
        }

        public static string Decrypt(string encrypted)
        {
            EncryptDecrypt ed = new EncryptDecrypt();
            var encoder = new ASCIIEncoding();
            return encoder.GetString(ed.Decrypt(Convert.FromBase64String(encrypted)));
        }

        private byte[] Encrypt(byte[] buffer)
        {
            return Transform(buffer, encryptor);
        }

        private byte[] Decrypt(byte[] buffer)
        {
            return Transform(buffer, decryptor);
        }

        private byte[] Transform(byte[] buffer, ICryptoTransform transform)
        {
            MemoryStream stream = new MemoryStream();
            using (CryptoStream cs = new CryptoStream(stream, transform, CryptoStreamMode.Write))
            {
                cs.Write(buffer, 0, buffer.Length);
            }
            return stream.ToArray();
        }
    }
}