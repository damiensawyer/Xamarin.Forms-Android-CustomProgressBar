﻿using System;
using Xamarin.Forms;
using CustomProgressBar.CustomControls;

namespace CustomProgressBar
{
	public class App
	{
		public static Page GetMainPage ()
		{	
			// Note that you can either use XAML... or CodeBehind... or just inline. 
			return new ProgressBarXAML ();
			//return new ProgressBarCodeBehind ();

//			var contentPage = new ContentPage {
//				//Title = "Custom Progress Bar"
//
//			};
//		
//			var progressBar = new CircularProgress {
//				ProgressColor = Color.FromHex("3498DB"),
//				ProgressBackgroundColor = Color.FromHex("B4BCBC"),
//				WidthRequest = 300,
//				HeightRequest = 300
//			};
//
//			var increase = new Button { Text = "+5" };
//			var decrease = new Button { Text = "-5" };
//			var indeterminate = new Button { Text = "Indeterminate" };
//
//			increase.Clicked += (sender, args) => progressBar.Progress += 5;
//			decrease.Clicked += (sender, args) => progressBar.Progress -= 5;
//
//			indeterminate.Clicked += (sender, args) => {
//				progressBar.Indeterminate = !progressBar.Indeterminate;
//			};
//
//			var actionsStack = new StackLayout {
//				Orientation = StackOrientation.Horizontal,
//				Spacing = 10,
//				HorizontalOptions = LayoutOptions.Center,
//				Children = {increase, decrease, indeterminate}
//			};
//
//
//			var slider = new Slider (50, 150, 100);
//
//			slider.ValueChanged += (sender, args) => progressBar.IndeterminateSpeed = (int)slider.Value;
//
//
//			var mainStack = new StackLayout {
//				Spacing = 10,
//				Padding = 10,
//				Children = {actionsStack, slider, progressBar }
//			};
//
//
//			contentPage.Content = mainStack;
//
//			return contentPage;
			//return new NavigationPage (contentPage);

		}
	}
}

