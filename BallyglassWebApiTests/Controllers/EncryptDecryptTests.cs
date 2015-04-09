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
            
            var expected = "niallfallon|nfallon@yahoo.com|2011";
            var cypher = EncryptDecrypt.Encrypt(expected);

            var actual = EncryptDecrypt.Decrypt(cypher);

            Assert.AreEqual(expected, actual);
        }
    }
}
