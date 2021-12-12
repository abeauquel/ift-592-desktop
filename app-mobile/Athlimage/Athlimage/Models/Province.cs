using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Xamarin.Forms;

namespace Athlimage.Models
{
    public class Province
    {
        public List<string> province = new List<string>();
        public Province(string pays)
        {
            switch (pays)
            {
                case "CA":
                    province.Add("QC");
                    province.Add("AB");
                    province.Add("BC");
                    province.Add("MB");
                    province.Add("NB");
                    province.Add("NL");
                    province.Add("NS");
                    province.Add("NT");
                    province.Add("NU");
                    province.Add("ON");
                    province.Add("PE");
                    province.Add("SK");
                    province.Add("YT");
                    break;
                case "US":
                    province.Add("AL");
                    province.Add("AK");
                    province.Add("AS");
                    province.Add("AZ");
                    province.Add("AR");
                    province.Add("CA");
                    province.Add("CO");
                    province.Add("CT");
                    province.Add("DE");
                    province.Add("DC");
                    province.Add("FL");
                    province.Add("GA");
                    province.Add("GU");
                    province.Add("HI");
                    province.Add("ID");
                    province.Add("IL");
                    province.Add("IN");
                    province.Add("IA");
                    province.Add("KS");
                    province.Add("KY");
                    province.Add("LA");
                    province.Add("ME");
                    province.Add("MD");
                    province.Add("MA");
                    province.Add("MI");
                    province.Add("MN");
                    province.Add("MS");
                    province.Add("MO");
                    province.Add("MT");
                    province.Add("NE");
                    province.Add("NV");
                    province.Add("NH");
                    province.Add("NJ");
                    province.Add("NM");
                    province.Add("NY");
                    province.Add("NC");
                    province.Add("ND");
                    province.Add("MP");
                    province.Add("OH");
                    province.Add("OK");
                    province.Add("OR");
                    province.Add("PA");
                    province.Add("PR");
                    province.Add("RI");
                    province.Add("SC");
                    province.Add("SD");
                    province.Add("TN");
                    province.Add("TX");
                    province.Add("UT");
                    province.Add("VT");
                    province.Add("VA");
                    province.Add("VI");
                    province.Add("WA");
                    province.Add("WV");
                    province.Add("WI");
                    province.Add("WY");
                    break;
                default:
                    province = new List<string>();
                    break;
            }
        }
    }
}