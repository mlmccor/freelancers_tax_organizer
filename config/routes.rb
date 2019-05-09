Rails.application.routes.draw do
  resources :employers
  resources :sessions
  resources :users


  resources :tax_years do
    resources :checks
    resources :employers
  end
  post '/sessions/new', to: "sessions#create"
  get '/auth/facebook/callback' => 'sessions#create'
  root 'welcome#home'



  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
