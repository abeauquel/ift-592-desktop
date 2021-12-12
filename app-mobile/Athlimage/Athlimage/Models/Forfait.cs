using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Xamarin.Forms;

namespace Athlimage.Models
{
    public class Forfait
    {
        public bool adresse;
        public bool photo2;
        public bool photo3;
        public List<string> Formats = new List<string>();
        public string format;
        public Forfait(string forfait)
        {
            switch (forfait)
            {
                case "Simple":
                    adresse = false;
                    photo2 = false;
                    photo3 = false;
                    Formats.Clear();
                    format = "";
                    Formats.Add("8,5x11");
                    Formats.Add("13x19");
                    break;

                case "Triple":
                    adresse = false;
                    photo2 = true;
                    photo3 = true;
                    Formats.Clear();
                    format = "";
                    Formats.Add("8,5x11");
                    Formats.Add("13x19");
                    break;

                case "Groupe":
                    adresse = false;
                    photo2 = false;
                    photo3 = false;
                    Formats.Clear();
                    format = "";
                    Formats.Add("8,5x11");
                    Formats.Add("13x19");
                    break;

                case "Poster":
                    adresse = true;
                    photo2 = false;
                    photo3 = false;
                    format = "Poster";
                    Formats.Add("Poster");
                    break;

                case "Cartes":
                    adresse = true;
                    photo2 = true;
                    photo3 = false;
                    format = "";
                    Formats.Add("9");
                    Formats.Add("18");
                    break;

                default:
                    break;

            }
        }
    }
}