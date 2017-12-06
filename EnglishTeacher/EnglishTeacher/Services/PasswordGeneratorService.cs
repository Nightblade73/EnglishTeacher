using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EnglishTeacher.Services
{
    public static class PasswordGeneratorService
    {
        public static string GeneratePassword(int length)
        {
            string iPass = "";
            string[] arr = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Z", "b", "c", "d", "f", "g", "h", "j", "k", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "z", "A", "E", "U", "Y", "a", "e", "i", "o", "u", "y" };
            Random rnd = new Random();
            for (int i = 0; i < length; i++)
            {
                iPass += arr[rnd.Next(0, 57)];
            }
            return iPass;
        }
    }
}