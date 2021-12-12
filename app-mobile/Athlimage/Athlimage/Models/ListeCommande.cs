using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Xamarin.Forms;

namespace Athlimage.Models
{
    public class ListeCommande
    {
        public string sender { get; set; }
        public string receiver { get; set; }
        public string action { get; set; }
        public IEnumerable<JsonItem> values { get; set; }
       public ListeCommande()
       {

       }
    }

}