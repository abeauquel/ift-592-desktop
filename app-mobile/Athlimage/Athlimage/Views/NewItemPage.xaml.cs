using Athlimage.Models;
using Athlimage.ViewModels;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Athlimage.Views
{
    public partial class NewItemPage : ContentPage
    {
        public Item Item { get; set; }

        public NewItemPage()
        {
            InitializeComponent();
            BindingContext = new NewItemViewModel();
        }

        private void Picker_SelectedIndexChanged(object sender, EventArgs e)
        {
            Forfait forfait = new Forfait((String)ForfaitPicker.SelectedItem);

            photo2lb.IsVisible = forfait.photo2;
            photo2en.IsVisible = forfait.photo2;
            photo2fr.IsVisible = forfait.photo2;
            photo3lb.IsVisible = forfait.photo3;
            photo3en.IsVisible = forfait.photo3;
            photo3fr.IsVisible = forfait.photo3;
            ListeFormat.ItemsSource = forfait.Formats;
            ListeFormat.SelectedIndex = 0;
            prenomlb.IsVisible = forfait.adresse; //cache toutes les infos d'adressev  
            if (forfait.adresse)
            {
                buttonAdresse.Text = "Sur Place";
            } else
            {
                buttonAdresse.Text = "Livraison";
            }
        }

        private void Picker2_SelectedIndexChanged(object sender, EventArgs e)
        {
            Province province = new Province((String)paysen.SelectedItem);
 
            provinceen.ItemsSource = province.province;
            provinceen.SelectedIndex = 0;
        }
    }
}