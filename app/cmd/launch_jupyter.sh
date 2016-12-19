osascript -e 'tell app "Terminal.app"
    do script "source activate '$1'; jupyter notebook"
end tell'
