Rails.application.routes.draw do
  resources :employers do
    resources :checks
  end
  resources :sessions
  resources :users
  resources :checks


  resources :tax_years do
    resources :checks
    resources :employers
    get 'employer/forms' => 'employers#form'

  end
  post '/sessions/new', to: "sessions#create"
  get '/auth/facebook/callback' => 'sessions#create'
  root 'welcome#home'
  get '/tax_years/:id/sorted' => 'tax_years#sorted', :as => 'tax_years_sorted'



  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
