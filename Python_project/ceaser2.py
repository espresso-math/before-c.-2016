#!/usr/bin/env python
# -*- coding: CP1252 -*-
#
# generated by wxGlade 0.6.8 (standalone edition) on Wed Aug 21 21:04:16 2013
#

import wx

# begin wxGlade: dependencies
import gettext
# end wxGlade

# begin wxGlade: extracode
# end wxGlade
def check(input,key_1):
        x = len(input)

        a = key_1**2
        if x <= a:
            y = a - x
            for i in range(0,y):
                input = input + '_'

        return input 

def c_code(clear,key_2):
    output = ''
    b = key_2**2
    for i in range(0,(b-1)):
        for j in range(0,b,key_2):
                output = output + clear[j+i]

        if (j+i) == (b-1):
            break
    
    return output

def c_code_2(clear,key_2):
    output = ''
    b = key_2**2
    for i in range(0,(b-1)):
        for j in range(0,b,key_2):
                output = output + clear[j+i]

        if (j+i) == (b-1):
            break
    chu = output.replace("~"," ")
    hjk = chu.replace("|","\n")
    nk = hjk.replace("_","")
    nk = nk.upper()
    return nk




def keyg(enter):
    n = len(enter)
    flag = 0
    for flag in range(0,100000):
        if flag >= n**0.5:
            break


    return  flag


class MyFrame(wx.Frame):
    def __init__(self, *args, **kwds):
        # begin wxGlade: MyFrame.__init__
        kwds["style"] = wx.DEFAULT_FRAME_STYLE
        wx.Frame.__init__(self, *args, **kwds)
        self.label_1 = wx.StaticText(self, wx.ID_ANY, _("Enter text here:\n\n"))
        self.text_ctrl_1 = wx.TextCtrl(self, wx.ID_ANY, "")
        self.button_1 = wx.Button(self, wx.ID_ANY, _("Encode"))
        self.button_2 = wx.Button(self, wx.ID_ANY, _("Decode"))

        self.__set_properties()
        self.__do_layout()

        self.Bind(wx.EVT_BUTTON, self.encode, self.button_1)
        self.Bind(wx.EVT_BUTTON, self.decode, self.button_2)
        # end wxGlade

    def __set_properties(self):
        # begin wxGlade: MyFrame.__set_properties
        self.SetTitle(_("Ceaser's Code"))
        self.SetBackgroundColour(wx.Colour(255, 255, 255))
        self.label_1.SetBackgroundColour(wx.Colour(255, 255, 255))
        # end wxGlade

    def __do_layout(self):
        # begin wxGlade: MyFrame.__do_layout
        sizer_1 = wx.FlexGridSizer(3, 2, 0, 0)
        sizer_1.Add(self.label_1, 0, 0, 0)
        sizer_1.Add(self.text_ctrl_1, 0, 0, 0)
        sizer_1.Add(self.button_1, 0, 0, 0)
        sizer_1.Add(self.button_2, 0, 0, 0)
        self.SetSizer(sizer_1)
        sizer_1.Fit(self)
        self.Layout()
        # end wxGlade

    def encode(self, event):  # wxGlade: MyFrame.<event_handler>
        original = str(self.text_ctrl_1.Value)
        if original != '' :
            hj = original.lower()
            cpy = hj.replace(" ","~")
            copy = cpy.replace("\n","|")
            key = keyg(copy)
            ng = c_code(check(copy,key),key)
            self.text_ctrl_1.SetLabelText(ng)
        else:
            self.text_ctrl_1.SetLabel("Try Again!")
        event.Skip()

    def decode(self, event):  # wxGlade: MyFrame.<event_handler>
        original = str(self.text_ctrl_1.Value)
        if original != '' :
            hj = original.lower()
            cpy = hj.replace(" ","~")
            copy = cpy.replace("\n","|")
            key = keyg(copy)
            ng = c_code_2(check(copy,key),key)
            self.text_ctrl_1.SetLabelText(ng)
        else:
            self.text_ctrl_1.SetLabelText("Try Again!")
        event.Skip()

# end of class MyFrame
if __name__ == "__main__":
    gettext.install("app") # replace with the appropriate catalog name

    app = wx.PySimpleApp(0)
    wx.InitAllImageHandlers()
    frame_1 = MyFrame(None, wx.ID_ANY, "")
    app.SetTopWindow(frame_1)
    frame_1.Show()
    app.MainLoop()
