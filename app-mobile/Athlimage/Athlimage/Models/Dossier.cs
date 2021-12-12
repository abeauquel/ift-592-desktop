using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Xamarin.Forms;

namespace Athlimage.Models
{
    public class Dossier
    {
        public string nom { get; set; }
        public bool photo { get; set; }
        public Dossier(string text)
        {
            nom = text;
            if (nom.Contains(".jpg"))
            {
                photo = true;
            } else
            {
                photo = false;
            }
        }
    }
}