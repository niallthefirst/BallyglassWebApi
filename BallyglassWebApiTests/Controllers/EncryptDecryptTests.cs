using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BallyglassWebApi.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
namespace BallyglassWebApi.Controllers.Tests
{
    [TestClass()]
    public class EncryptDecryptTests
    {
        [TestMethod()]
        public void EncryptTest()
        {
            EncryptDecrypt encryptDecrypt = new EncryptDecrypt();
            var expected = "user name,email@email.com,1/2/2011";
            var cypher = encryptDecrypt.Encrypt(expected);

            var actual = encryptDecrypt.Decrypt(cypher);

            Assert.AreEqual(expected, actual);
        }
    }
}
